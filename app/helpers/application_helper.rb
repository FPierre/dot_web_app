module ApplicationHelper
  def pretty_errors errors
    if errors.is_a? Hash
      pretty_msg = '<ul>'

      errors.each do |attr, errors_msg|
        msg = if errors_msg.is_a? Array
          errors_msg.to_sentence
        else
          errors_msg.first
        end

        pretty_msg << "<li>#{attr} : #{msg}</li>"
      end

      pretty_msg << '</ul>'
    else
      errors
    end
  end
end
